import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { letterResponseAPI } from 'api/v1/letters'

import TypeToggle from 'components/item/TypeToggle'

function Result() {
  const nav = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {};
  const [active, setActive] = useState(false); // false는 F true는 T

  console.log("location", location.state)
  
    return (
      <div className="result">
        <div className="result__inner">
          <div>test</div>
        </div>
      </div>
    )
  }
  
  export default Result;
  