
const Switch = ({ active, setActive }) => {
  const toggleSwitch = () => {
    setActive(!active)
  };

  return (
    <div className={`default-switch ${active ? "on" : "off"}`} onClick={toggleSwitch} >
      <div className="toggle"></div>
    </div>
  );
};

export default Switch;