from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain_community.chat_models import ChatOpenAI
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Avoid OpenMP runtime conflicts
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set OpenAI API Key from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in the environment variables")

# Initialize the LLM
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    openai_api_key=OPENAI_API_KEY,
)

vector_store = None

def process_pdf(files):
    """Extract text from uploaded PDF files."""
    text = ""
    for file in files:
        pdf_reader = PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def process_photos(files):
    """Generate captions for uploaded photo files."""
    captions = []
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

    for file in files:
        image = Image.open(file.stream).convert('RGB')
        inputs = processor(image, return_tensors="pt")
        outputs = model.generate(**inputs)
        caption = processor.decode(outputs[0], skip_special_tokens=True)
        captions.append(caption)
    return captions

@app.route('/upload', methods=['POST'])
def upload():
    """Handle PDF file uploads."""
    global vector_store
    files = request.files.getlist('files')
    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    text = process_pdf(files)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_text(text)

    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    return jsonify({"message": "PDF files processed successfully"}), 200

@app.route('/upload-photos', methods=['POST'])
def upload_photos():
    """Handle photo uploads and generate captions."""
    files = request.files.getlist('photos')
    if not files:
        return jsonify({"error": "No photo files uploaded"}), 400

    captions = process_photos(files)
    return jsonify({"captions": captions}), 200

@app.route('/chat', methods=['POST'])
def chat():
    """Answer questions based on uploaded PDFs."""
    global vector_store
    if not vector_store:
        return jsonify({"error": "No documents uploaded yet"}), 400

    question = request.json.get('question')
    if not question:
        return jsonify({"error": "No question provided"}), 400

    docs = vector_store.similarity_search(question)
    chain = load_qa_chain(llm, chain_type="stuff")
    answer = chain({"input_documents": docs, "question": question})["output_text"]
    return jsonify({"answer": answer}), 200

if __name__ == '__main__':
    app.run(port=8000)
