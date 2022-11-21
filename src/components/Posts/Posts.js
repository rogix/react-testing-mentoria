const api = "https://jsonplaceholder.typicode.com/posts";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);

  // fetch posts with axios
  useEffect(() => {
    axios.get(api).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
