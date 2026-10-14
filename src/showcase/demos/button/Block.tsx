import { GlassButton, GlassStack } from 'glass-design-system';
import { GithubIcon, MailIcon } from '../icons';

// `block` fills the container: stacked actions on a narrow card or a phone.
export default function ButtonBlock() {
  return (
    <GlassStack gap={2} style={{ width: 'min(100%, 20rem)' }}>
      <GlassButton block size="lg" variant="primary">
        <MailIcon /> Continue with email
      </GlassButton>
      <GlassButton block size="lg">
        <GithubIcon /> Continue with GitHub
      </GlassButton>
    </GlassStack>
  );
}
