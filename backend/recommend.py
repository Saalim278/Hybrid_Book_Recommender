# import sys
# import pandas as pd
# import numpy as np
# from scipy.sparse import load_npz
# import json


# # Load book data
# books = pd.read_csv("clean_book.csv", low_memory=False)
# #books['ISBN'] = books['ISBN'].astype(str).str.replace('-', '').str.strip().str.upper()
# # Load similarity matrix
# similarity_matrix = load_npz("book_similarity.npz")

# # Get ISBN from command-line
# if len(sys.argv) < 2:
#     print(json.dumps({"error": "No ISBN provided"}))
#     sys.exit(1)

# isbn = sys.argv[1]

# # Check if ISBN exists
# if isbn not in books['ISBN'].values:
#     print(json.dumps({"error": "Book not found"}))
#     sys.exit(1)

# # Get index of the book
# index = books[books["ISBN"] == isbn].index[0]

# # Get similarity scores
# similarity_scores = list(enumerate(similarity_matrix[index].toarray()[0]))
# similar_books = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:6]

# # Build results
# results = []
# for i, score in similar_books:
#     results.append({
#         "isbn": books.iloc[i]["ISBN"],
#         "title": books.iloc[i]["Book-Title"],
#         "author": books.iloc[i]["Book-Author"],
#         "coverImage": books.iloc[i]["Image-URL-L"]
#     })

# # Output result
# print(json.dumps(results))


import sys
import pandas as pd
import numpy as np
from scipy.sparse import load_npz
import json

# Load book data
books = pd.read_csv("clean_book.csv", low_memory=False)

# Load similarity matrix
similarity_matrix = load_npz("book_similarity.npz")

# Get ISBN from command-line
if len(sys.argv) < 2:
    print(json.dumps({"error": "No ISBN provided"}))
    sys.exit(1)

isbn = sys.argv[1].strip()

# Check if ISBN exists in the DataFrame
if isbn not in books['ISBN'].values:
    print(json.dumps({"error": "Book not found"}))
    sys.exit(1)

# Get the index of the book
index = books[books["ISBN"] == isbn].index[0]

# Check if index is within the similarity matrix range
if index >= similarity_matrix.shape[0]:
    print(json.dumps({"error": f"Index {index} out of range for similarity matrix of shape {similarity_matrix.shape}"}))
    sys.exit(1)

# Get similarity scores
try:
    similarity_scores = list(enumerate(similarity_matrix[index].toarray()[0]))
except Exception as e:
    print(json.dumps({"error": "Failed to compute similarity scores", "details": str(e)}))
    sys.exit(1)

# Sort and get top 5 similar books (excluding itself)
similar_books = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:6]

# Build results
results = []
for i, score in similar_books:
    if i < len(books):
        book = books.iloc[i]
        results.append({
            "isbn": book["ISBN"],
            "title": book["Book-Title"],
            "author": book["Book-Author"],
            "coverImage": book["Image-URL-L"]
        })

# Output result
print(json.dumps(results))
