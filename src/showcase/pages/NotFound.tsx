import { Link } from 'react-router-dom';
import { GlassButton, GlassCluster } from 'glass-design-system';
import { Page, PageHeader } from '../site/Page';

const NotFound = () => (
  <Page>
    <PageHeader title="Nothing here" lede="This page doesn’t exist, or it moved when the docs were rebuilt for 1.0.">
      <GlassCluster gap={3}>
        <GlassButton as={Link} to="/" variant="primary">
          Go to the overview
        </GlassButton>
        <GlassButton as={Link} to="/components">
          Browse components
        </GlassButton>
      </GlassCluster>
    </PageHeader>
  </Page>
);

export default NotFound;
