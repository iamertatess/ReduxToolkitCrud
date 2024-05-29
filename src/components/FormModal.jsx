import { Form, Button, Modal } from 'react-bootstrap';
import { addTask, editTask } from '../redux/slices/crudSlice';
import { useDispatch } from 'react-redux';

const FormModal = ({ editItem, isOpen, handleClose }) => {
  const dispatch = useDispatch();

  
  const handleSubmit = (e) => {
  
    e.preventDefault();


    const formData = new FormData(e.target);

    
    const taskData = Object.fromEntries(formData.entries());

    
    if (editItem) {
    
      dispatch(editTask({ id: editItem.id, ...taskData }));
    } else {
     
      dispatch(addTask(taskData));
    }

  
    handleClose();
  };

  return (
    <Modal centered show={isOpen} onHide={handleClose} className="text-dark">
      <Modal.Header closeButton>
        <Modal.Title>
          {editItem ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <Form.Group>
            <Form.Label>Görev Başlığı</Form.Label>
            <Form.Control
              name="title"
              placeholder="Navbarı Düzenle"
              defaultValue={editItem?.title}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>İsminiz</Form.Label>
            <Form.Control
              name="author"
              defaultValue={editItem?.author}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Atanıcak Kişi</Form.Label>
            <Form.Control
              name="assigned_to"
              defaultValue={editItem?.assigned_to}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Son Teslim Tarihi</Form.Label>
            <Form.Control
              name="end_date"
              defaultValue={editItem?.end_date}
              type="date"
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Vazgeç
            </Button>
            <Button type="submit" variant="primary">
              {editItem ? 'Kaydet' : 'Oluştur'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
