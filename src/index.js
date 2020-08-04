import React, { useState, useEffect, useRef, Fragment } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

import style from "./css/editablelabel.css";

const EditableLabel = (props) => {
  const textInput = useRef(null);
  const [view, setView] = useState("label");
  const [value, setValue] = useState(props.initialValue);
  const [previous, setPrevious] = useState(props.initialoValue);
  const [hoverEditIcon, setHoverEditIcon] = useState(false);

  useEffect(() => {
    if (view === "text") {
      textInput.current.focus();
    }
  }, [view, textInput]);

  useEffect(() => {
    setValue(props.initialValue || "-");
    setPrevious(props.initialValue || "-");
  }, [props.initialValue]);
  const keyUp = (e) => {
    if (props.disableKeys === true) {
      return;
    }

    if (e.key === "Escape") {
      setValue(previous || "-");
      setView("label");
    } else if (e.key === "Enter") {
      setValue(e.target.value || "-");
      setPrevious(e.target.value || "-");
      setView("label");

      props.save(e.target.value);
    }
  };

  const renderLabel = () => {
    if (props.isWebsite)
      return (
        <a
          href="#d"
          onClick={(e) => {
            e.preventDefault();
            setView("text");
          }}
        >
          {value}
        </a>
      );
    else
      return (
        <span
          className={props.labelClass || ""}
          onClick={() => {
            setView("text");
          }}
        >
          {value}
        </span>
      );
  };

  const renderInput = () => {
    return (
      <Fragment>
      <div>
        <input
          
          type={props.inputType}
          value={value}
          ref={textInput}
          className={cx(props.inputClass,'w-100 d-block')}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          // onBlur={(e) => {
          //   setView("label");
          //   setPrevious(e.target.value);
          //   props.save(e.target.value);
          // }}
          onKeyUp={keyUp}
        />
        </div>
        <div className={style.card}>
          <button
            className={cx(style.wh20, "border-0 rounded")}
            onClick={() => {
              const e = { ...textInput };
              setPrevious(e.current.value);
              props.save(e.current.value);
              setView("label");
            }}
          >
            <span className={"text-secondary"}>&#10003;</span>
          </button>

          <span className="p-1" />
          <button
            className={cx(style.wh20, "border-0 rounded")}
            onClick={() => {
              setValue(previous || "-");
              setView("label");
            }}
          >
            <span className={"text-secondary"}>&#10007;</span>
          </button>
        </div>
      </Fragment>
    );
  };
  return (
    <div
      key={props.heading}
      onMouseEnter={() => setHoverEditIcon(true)}
      onMouseLeave={() => setHoverEditIcon(false)}
      className='w-75'
    >
      <h5>
        {props.heading}
        <span className={cx(style.webicon, { "d-none": !props.isWebsite })}>
          <a href={value}>
            {
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                size="2x"
                className={style.fs10}
              />
            }
          </a>
        </span>

        <span
          className={cx(style.editicon, {
            [style.opacity0]: !hoverEditIcon,
            [style.opacity1]: hoverEditIcon,
            "d-none": !props.isEditIcon,
          })}
          onClick={() => {
            if (view === "label") {
              setView("text");
            }
          }}
        >
          {
            <FontAwesomeIcon
              icon={faPencilAlt}
              size="1x"
              className={style.fs10}
            />
          }
        </span>

        <div className={style.pt6}>
          <h6> {view === "label" ? renderLabel() : renderInput()}</h6>
        </div>
      </h5>
    </div>
  );
};

export default EditableLabel;

EditableLabel.propTypes = {
  initialValue: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  inputType: PropTypes.string,
  disableKeys: PropTypes.bool,
  heading: PropTypes.string,
  isWebsite: PropTypes.bool,
  isEditIcon: PropTypes.bool,
};
EditableLabel.defaultProps = {
  inputType: "text",
  disableKeys: false,
  heading: "",
  isWebsite: false,
  isEditIcon: true,
};
