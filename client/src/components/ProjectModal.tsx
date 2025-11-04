import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath?: string;
  content?: string;
  error?: string;
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  pdfPath,
  content,
  error,
}: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <Card
        className="relative w-full max-w-6xl max-h-[90vh] m-4 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-content"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2
            id="modal-title"
            className="text-2xl font-semibold text-foreground"
            data-testid="modal-title"
          >
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-modal"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md">
              <p className="font-medium">Unable to load project details</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          {pdfPath && !error && (
            <iframe
              src={pdfPath}
              className="w-full h-full min-h-[600px] border-0"
              title={title}
              data-testid="iframe-pdf"
            />
          )}
          {content && !error && (
            <div
              className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-mono text-sm"
              data-testid="text-content"
            >
              {content}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
