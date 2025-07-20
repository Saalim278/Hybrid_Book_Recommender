import pandas as pd 

books = pd.read_csv("books.csv", low_memory=False)

books = books.dropna(subset=['ISBN','Book-Title', 'Book-Author'])
books = books.drop_duplicates(subset='ISBN')

#Save cleaned version
books.to_csv("clean_book.csv", index=False)
print("Cleaned data saved as clean_book.csv")