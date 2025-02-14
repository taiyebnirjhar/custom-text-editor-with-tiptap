const sampleBlog = `
<article class="prose">
  <h1>Welcome to My Blog</h1>
  <p class="lead">This is a sample blog post with HTML content and styling.</p>

  <h2>Features</h2>
  <ul>
    <li>Full HTML support</li>
    <li>Maintains styling and structure</li>
    <li>Supports images and media</li>
  </ul>

  <h3>Rich Content Example</h3>
  <p>Here's some <strong>bold text</strong>, <em>italic text</em>, and a <a href="#">link</a>.</p>

  <blockquote>
    This is a blockquote with custom styling. It demonstrates how the editor preserves HTML structure.
  </blockquote>

  <div class="code-block">
    <pre><code>// This is a code block
console.log("Hello, World!");</code></pre>
  </div>

  <figure>
    <img src="https://dummyimage.com/600x400/000/fff" alt="Sample image" />
    <figcaption>A sample image with caption</figcaption>
  </figure>

  <h3>Tables are supported too</h3>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Support</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>HTML</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Styling</td>
        <td>✅</td>
      </tr>
    </tbody>
  </table>
</article>
`;

export default sampleBlog;
