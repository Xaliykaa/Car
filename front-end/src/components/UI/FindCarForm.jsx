import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Хаанаас" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Хаашаа" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Машин авах цаг" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            placeholder="Машин авах цаг"
            required
          />
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="ac">Бензин</option>
            <option value="non-ac">Цахилгаан</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Машин Хайх</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
