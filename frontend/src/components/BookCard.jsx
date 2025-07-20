import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookSto } from "../Context";


export default function BookCard({ book }) {
  const {defaultAddresses} = useContext(BookSto);
  const navigate = useNavigate();
  return (
    <div key={book.id} className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={book.coverImage}
          className="card-img-top"
          alt={book.title}
          style={{ height: "300px", objectFit: "cover", width: "100%" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title multiline-ellipsis">{book.title}</h5>
          <p className="card-text text-muted">by {book.author}</p>
          <p className="card-text fw-bold">399</p>
          <a
            onClick={() => {
              if (defaultAddresses) {
                navigate("/buynow", {
                  state: {
                    book,
                  },
                });
              } else {
                navigate("/new-address", {
                  state: {
                    book,
                  },
                });
              }
            }}
            className="btn btn-primary mt-auto"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
