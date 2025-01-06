
# LLM Chatbot App

This app allows you to chat with multiple PDFs and images using OpenAI's GPT model. You can upload PDFs and images, and the chatbot will continue to answer your questions based on the content within those files.

## Features
- **Multiple File Support**: Upload PDFs and images for chat-based interaction.
- **Continuous Chatbot**: The chatbot allows continuous conversation, where you can ask multiple questions, and it will maintain context.
- **OpenAI Integration**: The app uses OpenAI's GPT model for generating intelligent responses based on the provided documents and images.

## Requirements
Before getting started, make sure you have the following installed on your local machine:
- Python 3.x
- Node.js (if applicable)
- Git (for version control)

## Installation

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Set Up Backend (Python)

Ensure you have all the required dependencies for the backend by following these steps:

#### a. Create a Virtual Environment

Create a virtual environment to manage Python dependencies:

```bash
python -m venv venv
```

Activate the virtual environment:

- **Windows**:
  ```bash
  .\venv\Scripts\activate
  ```

#### b. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

#### c. Set OpenAI API Key

You need to create an OpenAI account and get your API key. Once you have the API key, add it to your environment variables:

- **Windows**:
  ```bash
  set OPENAI_API_KEY=your_openai_api_key
  ```

### 3. Set Up Frontend (if applicable)

If your app includes a frontend, follow these steps to set it up:

#### a. Install Node.js Dependencies

Navigate to the frontend directory (if applicable) and install the necessary dependencies:

```bash
cd frontend
npm install
```

#### b. Start the Frontend

Run the frontend application:

```bash
npm start
```

### 4. Start the Backend

Run the backend server:

```bash
python app.py
```

This should start the chatbot app. You can now interact with the chatbot through the user interface or via API calls.

## Usage

1. **Upload PDFs and Images**: The app allows you to upload PDF documents and images.
2. **Start Chatting**: Once the files are uploaded, the chatbot will process the content and allow you to ask questions based on the information in those files.
3. **Continue Conversations**: The chatbot will maintain context, allowing you to ask follow-up questions related to the documents you provided.

## Example Chat Flow

- **User**: "What is the main topic of this document?"
- **Chatbot**: "The main topic of the document is Machine Learning."

## Contributing

If you want to contribute to the development of this app, feel free to fork the repository and make a pull request with your improvements or fixes.
Images for preview:
![WhatsApp Image 2025-01-06 at 19 19 53_6d9518aa](https://github.com/user-attachments/assets/5a6925f8-7593-48fa-8018-8a8f3cc2f2cf)
![WhatsApp Image 2025-01-06 at 19 20 13_a4cc8973](https://github.com/user-attachments/assets/87c3c82b-6fdc-40ad-bd2a-8a0b25dd7ae2)
![WhatsApp Image 2025-01-06 at 19 20 36_a16cfc6f](https://github.com/user-attachments/assets/0d2884c8-6c4e-4f50-9621-7d9603cc800a)
![WhatsApp Image 2025-01-06 at 19 22 01_a89ed655](https://github.com/user-attachments/assets/0a31e40c-5c2c-4eaa-bc43-11b7633a9289)

![WhatsApp Image 2025-01-06 at 19 20 51_2664221d](https://github.com/user-attachments/assets/1df99c16-09e2-429f-be2b-9650be7dc5ba)
![WhatsApp Image 2025-01-06 at 19 21 37_df04e19d](https://github.com/user-attachments/assets/543ab80a-c680-407d-bbde-f563aeea3083)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README should cover all the essential details to get started with your app, including installation, usage, and basic configuration for OpenAI. Let me know if you need any adjustments!
