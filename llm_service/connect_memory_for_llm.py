from dotenv import load_dotenv
load_dotenv(override=True)
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_groq import ChatGroq
import os

DB_PATH = "vectorstore/db_faiss"

# -------------------------------
# Load LLM (Groq – stable)
# -------------------------------
def load_llm():
    return ChatGroq(
        model="llama-3.1-8b-instant",
        temperature=0.3,
        api_key=os.environ["GROQ_API_KEY"]
    )

# -------------------------------
# Prompt
# -------------------------------
PROMPT = """
Answer the question ONLY using the context.
If the answer is not present, say "I don't know".

Context:
{context}

Question:
{input}

Answer:
"""

prompt = PromptTemplate.from_template(PROMPT)

# -------------------------------
# Load Vector Store
# -------------------------------
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = FAISS.load_local(
    DB_PATH,
    embeddings,
    allow_dangerous_deserialization=True
)

retriever = db.as_retriever(search_kwargs={"k": 5})

# -------------------------------
# Create Retrieval Chain (NEW API)
# -------------------------------
llm = load_llm()

doc_chain = create_stuff_documents_chain(
    llm=llm,
    prompt=prompt
)

qa_chain = create_retrieval_chain(
    retriever=retriever,
    combine_docs_chain=doc_chain
)

# -------------------------------
# Query
# -------------------------------
query = input("Ask a medical question: ")

response = qa_chain.invoke({"input": query})

print("\n🧠 Answer:\n")
print(response["answer"])
