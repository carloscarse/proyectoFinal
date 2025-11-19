import Modal from 'react-modal';

Modal.setAppElement('#root');

function CustomModal({ isOpen, onClose, children, title }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-gray-900 text-white p-6 rounded-lg shadow-xl max-w-xl mx-auto mt-20 transition-all"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-red-400 hover:text-red-600 text-lg">✕</button>
      </div>
      {children}
    </Modal>
  );
}

export default CustomModal;