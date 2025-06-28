const QuoteButton = ({ onClick }) => (
  <div className="button-wrapper">
    <button className="btn btn-primary btn-md" onClick={onClick}>Generate Quote</button>
  </div>
);

export default QuoteButton;