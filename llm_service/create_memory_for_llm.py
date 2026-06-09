from dotenv import load_dotenv
load_dotenv()

from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

DATA_PATH = "data/"
DB_PATH = "vectorstore/db_faiss"

print("📄 Loading PDF files...")
loader = DirectoryLoader(
    DATA_PATH,
    glob="*.pdf",
    loader_cls=PyPDFLoader
)
documents = loader.load()
print(f"Pages loaded: {len(documents)}")

print("✂️ Splitting documents...")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=100
)
chunks = text_splitter.split_documents(documents)
print(f"Text chunks created: {len(chunks)}")

print("🧠 Creating embeddings...")
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

print("💾 Building FAISS vector store...")
db = FAISS.from_documents(chunks, embeddings)
db.save_local(DB_PATH)

print("✅ FAISS vector store created successfully")
