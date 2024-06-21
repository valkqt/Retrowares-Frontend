import { Screenshot } from '@/types';
import Modal from 'react-bootstrap/Modal';
import css from "./ScreenshotModal.module.css"

interface ScreenshotModalProps {
    show: boolean,
    onHide: CallableFunction,
    item: Screenshot,
}

export default function ScreenshotModal({ show, onHide, item }: ScreenshotModalProps) {
    return (
        <Modal show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={css.Modal}
        >
            <figure>
                <img src={item.thumbnail} />
                <figcaption>{item.caption}</figcaption>

            </figure>

        </Modal>
    );
}
