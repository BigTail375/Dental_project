from flask import Flask, request
from flask_cors import CORS
import json
import requests
from bs4 import BeautifulSoup
import openai
import time

def process_large_text(text, max_length=2048):
    chunks = split_text(text, max_length)
    processed_text = ""

    for chunk in chunks:
        prompt = f"{processed_text} {chunk}"
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=2000,
            n=1,
            stop=None,
            temperature=0.1,
        )

        processed_chunk = response.choices[0].text.strip()
        processed_text += processed_chunk

        

    return processed_text

def split_text(text, max_length):
    paragraphs = text.split("\n")
    chunks = []

    current_chunk = ""

    for paragraph in paragraphs:
        if len(current_chunk) + len(paragraph) < max_length:
            current_chunk += f"{paragraph}\n"
        else:
            chunks.append(current_chunk.strip())
            current_chunk = f"{paragraph}\n"

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks

app = Flask(__name__)
cors = CORS()
cors.init_app(app)
api_key = "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"
url_flag = False

@app.route('/asked',methods = ['POST'])
def root():
    url = json.loads(request.data)["urlInput"]

    try:
        page = requests.get(url)

        soup = BeautifulSoup(page.content, "html.parser")
        p_content = str(soup.text).split()
        time.sleep(10)
        # print(p_content)
        return ({"message": True})
    except:
        return ({"message": "falled"})
    

@app.route('/message',methods = ['POST'])
def message():
    question = json.loads(request.data)["question"]
    query = "If above sentence does not include the dentistry, the result would be something like this. Please answer only in the field of dentistry."
    try:
        openai.api_key = api_key
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=question + query,
            max_tokens=2000,
            n=1,
            stop=None,
            temperature=0.1,
        )

        processed_chunk = response.choices[0].text.strip()

        print(processed_chunk)
        return ({"message": processed_chunk })
    except:
        return ({"message": "falled"})
  
if __name__ == '__main__':
    app.run(port=4001, debug=True) 