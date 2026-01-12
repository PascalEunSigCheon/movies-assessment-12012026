import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
// import "./styles.css";

const DynamicForm = ({field1_name, field1_width, field1_height}) => {
    return (
        <div>

            <form>
                <label for="fname">{field1_name}</label>
                <input type="text" id="fname" name="fname" size={field1_width} height={field1_height}></input>
            </form>
            {/* the idea is to input x number of inputs like this. */}

        </div>
    );
}

export default DynamicForm;

