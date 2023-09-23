import Form from "react-bootstrap/Form";
function AddTransaction() {
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Ví</option>
          <option value="1">Tiền mặt</option>
          <option value="2">Thẻ tín dụng</option>
          <option value="3">Thẻ visa</option>
        </Form.Select>
        <Form.Select
          size="lg"
          aria-label="Default select example"
          className="m-2"
        >
          <option>Nhóm</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Control
          type="number"
          placeholder="Số tiền"
          
          size="lg"
          className="m-2"
        />
      </div>
      <div className="d-flex justify-content-around align-items-center">
        
       
        <Form.Control
          type="date"
          placeholder="Số tiền"
          
          size="lg"
          className="m-2"
        />
        <Form.Control as="textarea" rows={3} />
      </div>
    </div>
  );
}

export default AddTransaction;
