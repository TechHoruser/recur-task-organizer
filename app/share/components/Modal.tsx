import { useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  open,
  onClose,
  children,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(open);

  return (<>
    {
      isOpen
      && <div
        className="
          fixed
          top-0
          left-0
          w-full
          h-full
          bg-black
          bg-opacity-80
          flex
          justify-center
          items-center
        "
        onClick={() => {
          setIsOpen(false);
          onClose();
        }}
      >
        <div
          className="bg-white/10 p-4 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    }
  </>);
}
