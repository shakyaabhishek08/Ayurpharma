import streamlit as st
from dotenv import load_dotenv
from langchain_groq import ChatGroq
import os
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv(override=True)

DB_FAISS_PATH = "vectorstore/db_faiss"

CUSTOM_PROMPT = """
You are MediBot, a medical AI assistant.

Answer ONLY using the context below.
If the answer is not present, say "I don't know".

Context:
{context}

Question:
{question}

Answer:
"""

def get_prompt():
    return PromptTemplate(
        template=CUSTOM_PROMPT,
        input_variables=["context", "question"]
    )

def load_llm():
    return ChatGroq(
        model="llama-3.1-8b-instant",
        temperature=0.3,
        api_key=os.environ["GROQ_API_KEY"]
    )

@st.cache_resource
def load_vectorstore():
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    return FAISS.load_local(
        DB_FAISS_PATH,
        embeddings,
        allow_dangerous_deserialization=True
    )

st.set_page_config(
    page_title="MediBot",
    page_icon="🩺",
    layout="wide"
)

st.title("🩺 MediBot - AI Medical Assistant")

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).markdown(msg["content"])

user_query = st.chat_input("Ask a medical question...")

if user_query:
    st.chat_message("user").markdown(user_query)
    st.session_state.messages.append({"role": "user", "content": user_query})

    with st.spinner("Thinking..."):
        qa_chain = RetrievalQA.from_chain_type(
            llm=load_llm(),
            chain_type="stuff",
            retriever=load_vectorstore().as_retriever(search_kwargs={"k": 5}),
            chain_type_kwargs={"prompt": get_prompt()},
        )

        response = qa_chain.invoke({"query": user_query})
        answer = response["result"]

    st.chat_message("assistant").markdown(answer)
    st.session_state.messages.append({"role": "assistant", "content": answer})
