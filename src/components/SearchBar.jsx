import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";

// Filtra en tiempo real: cada tecla actualiza el valor del padre
export default function SearchBar({ valor, onChange }) {
  return (
    <Form role="search" onSubmit={(e) => e.preventDefault()}>
      <Form.Label htmlFor="buscador" className="visually-hidden">
        Buscar productos
      </Form.Label>
      <InputGroup>
        <InputGroup.Text aria-hidden="true">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          id="buscador"
          type="search"
          placeholder="Buscar por nombre, categoría o descripción..."
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        {valor && (
          <Button
            variant="outline-secondary"
            aria-label="Borrar búsqueda"
            onClick={() => onChange("")}
          >
            <FaTimes aria-hidden="true" />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
}
