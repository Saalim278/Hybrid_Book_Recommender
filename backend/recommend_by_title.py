import sys
import pandas as pd
import json

# Load book data
books = pd.read_csv("clean_book.csv", low_memory=False)

# Get title input from command-line
if len(sys.argv) < 2:
    print(json.dumps({"error": "No title provided"}))
    sys.exit(1)

title_input = sys.argv[1].strip().lower()

# Filter books by partial title match (case-insensitive)
matches = books[books["Book-Title"].str.lower().str.contains(title_input, na=False)]

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