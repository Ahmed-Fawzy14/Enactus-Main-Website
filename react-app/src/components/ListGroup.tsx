function ListGroup() {
  const items = ["Cairo", "Giza", "October", "Marassi"];

  return (
    <>
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item"
            onClick={() => console.log("nigga")}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
