// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link,useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import 'bytemd/dist/index.css';

const plugins = [gfm()];

function BlogList() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3001/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">博客文章list</h1>
      <Link to="/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        写新文章
      </Link>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600">
              发布于: {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostEditor({ isEdit }) {
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleSave = async () => {
    const response = await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: value,
      }),
    });
    if (response.ok) {
      window.location.href = '/';
    }
  };

  return (
    <div className="container mx-auto px-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="文章标题"
        className="w-full p-2 mb-4 border rounded"
      />
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => setValue(v)}
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        保存文章
      </button>
    </div>
  );
}

function PostView() {
  const [post, setPost] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <div>加载中...</div>;

  console.log('post',post)
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 text-white p-4 mb-8">
          <Link to="/" className="text-xl font-bold">
            我的博客
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/new" element={<PostEditor />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/edit/:id" element={<PostEditor isEdit={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;