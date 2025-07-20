import sys
import pandas as pd
import json

# Load book data
books = pd.read_csv("clean_book.csv", low_memory=False)

# Get author from command-line
if len(sys.argv) < 2:
    print(json.dumps({"error": "No author provided"}))
    sys.exit(1)

author_input = sys.argv[1].strip().lower()

# Filter books by matching author (case-insensitive)
matches = books[books["Book-Author"].str.lower().str.contains(author_input, na=False)]

# Get top 5 results
recommendations = matches.head(5)

# Format the results
results = []
for _, book in recommendations.iterrows():
    results.append({
        "isbn": book["ISBN"],
        "title": book["Book-Title"],
        "author": book["Book-Author"],
        "coverImage": book["Image-URL-L"]
    })

print(json.dumps(results))
