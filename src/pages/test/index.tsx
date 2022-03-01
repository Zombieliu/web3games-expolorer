import Link from 'next/link'
const Test = () =>{
    return (
        <ul>
            <li>
                <Link href="/post/abc">
                    <a>Go to pages/post/[pid].js</a>
                </Link>
            </li>
            <li>
                <Link href="/post/abc?foo=bar">
                    <a>Also goes to pages/post/[pid].js</a>
                </Link>
            </li>
            <li>
                <Link href="/post/abc/a-comment">
                    <a>Go to pages/post/[pid]/[comment].js</a>
                </Link>
            </li>
        </ul>
    )
}

export default Test