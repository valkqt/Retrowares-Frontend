import Modal from 'react-bootstrap/Modal';

interface ScreenshotModalProps {
    show: boolean,
    onHide: CallableFunction,
    image: string,
}

export default function ScreenshotModal({ show, onHide, image }: ScreenshotModalProps) {
    return (
        <Modal show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <img src={image} />
        </Modal>
    );
}
