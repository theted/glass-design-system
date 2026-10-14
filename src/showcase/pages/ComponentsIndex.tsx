import { Link } from 'react-router-dom';
import { GlassGrid, GlassPanel } from 'glass-design-system';
import { ArrowRightIcon } from '../demos/icons';
import { DOCS } from '../docs';
import { Page, PageHeader } from '../site/Page';

const ComponentsIndex = () => (
  <Page>
    <PageHeader
      title="Components"
      lede="Every part of the system on one material. Each page has live demos with their source, the props, and the plain CSS classes underneath."
    />
    <GlassGrid min="15rem">
      {DOCS.map((doc) => (
        <GlassPanel key={doc.slug} radius="card" padding="sm" className="tile">
          <div className="tile__preview" inert>
            {doc.thumb}
          </div>
          <span className="tile__group">{doc.group}</span>
          <h2 className="glass-h4">
            <Link to={`/components/${doc.slug}`} className="tile__link">
              {doc.name}
            </Link>
          </h2>
          <p className="glass-small">{doc.summary}</p>
          <span className="tile__more" aria-hidden="true">
            {doc.demos.length} {doc.demos.length === 1 ? 'demo' : 'demos'} <ArrowRightIcon />
          </span>
        </GlassPanel>
      ))}
    </GlassGrid>
  </Page>
);

export default ComponentsIndex;
