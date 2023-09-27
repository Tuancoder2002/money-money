import TransactionCategories from "../../component/DefaultLayout/TransactionCategories";
function Categories() {
  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <div className="rounded-1" style={{ backgroundColor: "#ffffff" }}>
          <TransactionCategories />
        </div>
      </div>
    </div>
  );
}

export default Categories;
