import openai

openai.api_key = "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"

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
            temperature=0.5,
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
