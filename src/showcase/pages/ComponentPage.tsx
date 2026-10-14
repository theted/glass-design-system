import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { GlassButton, GlassContainer, GlassSelect, GlassStack } from 'glass-design-system';
import { ArrowRightIcon } from '../demos/icons';
import { DOCS, GROUPS, findDoc } from '../docs';
import { CodeBlock, Snippet } from '../site/Code';
import { Demo } from '../site/Demo';
import { Guidelines, PageHeader, PropsTable, Section } from '../site/Page';
import NotFound from './NotFound';

const ComponentPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const doc = findDoc(slug);
  if (!doc) return <NotFound />;

  const index = DOCS.indexOf(doc);
  const prev = DOCS[index - 1];
  const next = DOCS[index + 1];

  return (
    <GlassContainer width="wide" className="page docs">
      <nav aria-label="Components" className="docs__side">
        <p className="glass-caption docs__side-title">Components</p>
        {GROUPS.flatMap(({ docs }) => docs).map((d) => (
          <NavLink key={d.slug} to={`/components/${d.slug}`} className="docs__link">
            {d.name}
          </NavLink>
        ))}
      </nav>

      <article style={{ minWidth: 0 }}>
        <GlassSelect
          size="sm"
          aria-label="Go to component"
          className="docs__picker"
          value={doc.slug}
          onChange={(e) => navigate(`/components/${e.target.value}`)}
        >
          {GROUPS.map(({ group, docs }) => (
            <optgroup key={group} label={group}>
              {docs.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </optgroup>
          ))}
        </GlassSelect>
        <PageHeader eyebrow={doc.group} title={doc.name} lede={doc.intro}>
          <Snippet>{doc.imports}</Snippet>
        </PageHeader>

        <Section id="examples" title="Examples">
          <div className="demo-group">
            {doc.demos.map((demo) => (
              <Demo key={demo.id} id={demo.id} title={demo.title} description={demo.description} layout={demo.layout} />
            ))}
          </div>
        </Section>

        {doc.props && (
          <Section id="props" title="Props">
            <GlassStack gap={12}>
              {doc.props.map((table, i) => (
                <PropsTable key={i} caption={table.caption} rows={table.rows} />
              ))}
            </GlassStack>
          </Section>
        )}

        {doc.css && (
          <Section id="css" title="Without React" lede="The same thing as classes, for plain HTML or another framework.">
            <CodeBlock title="HTML">{doc.css}</CodeBlock>
          </Section>
        )}

        {doc.guidelines && (
          <Section id="guidelines" title="Guidelines">
            <Guidelines dos={doc.guidelines.dos} donts={doc.guidelines.donts} />
          </Section>
        )}

        <nav aria-label="Next and previous" className="docs__pager">
          {prev ? (
            <GlassButton as={Link} to={`/components/${prev.slug}`} variant="ghost">
              <ArrowRightIcon style={{ rotate: '180deg' }} /> {prev.name}
            </GlassButton>
          ) : (
            <span />
          )}
          {next && (
            <GlassButton as={Link} to={`/components/${next.slug}`}>
              {next.name} <ArrowRightIcon />
            </GlassButton>
          )}
        </nav>
      </article>
    </GlassContainer>
  );
};

export default ComponentPage;
