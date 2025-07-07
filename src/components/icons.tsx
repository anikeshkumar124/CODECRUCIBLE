import {
  Play,
  Upload,
  Download,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  Loader2,
  FileJson,
  BrainCircuit,
  type LucideProps,
} from 'lucide-react';

export const Icons = {
  play: Play,
  upload: Upload,
  download: Download,
  check: CheckCircle2,
  close: XCircle,
  chevronRight: ChevronRight,
  sparkles: Sparkles,
  fileJson: FileJson,
  brain: BrainCircuit,
  spinner: (props: LucideProps) => (
    <Loader2 className="animate-spin" {...props} />
  ),
};
