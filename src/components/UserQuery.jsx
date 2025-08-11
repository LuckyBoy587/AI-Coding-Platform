import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const UserQuery = ({ text }) => (
  <div className="flex justify-end">
    <div className="prose prose-base dark:prose-invert max-w-3/4 self-end bg-[var(--color-user-bg)] text-[var(--color-text-primary)] p-3 rounded-lg mb-3 border-2 border-[var(--color-user-border)] shadow-md">
      <Markdown remarkPlugins={[remarkGfm]}>
        {text}
      </Markdown>
    </div>
  </div>
);

export default UserQuery;
