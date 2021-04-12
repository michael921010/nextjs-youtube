import _Head from "next/head";
import _Link from "next/link";
import _Image from "next/image";

const Head = ({ title, children }) => (
  <_Head>
    {title && <title>{title}</title>}
    {children}
  </_Head>
);

const Link = ({ href, children, className }) => (
  <_Link href={href}>
    <a className={className}>{children}</a>
  </_Link>
);

const Image = _Image;

export { Head, Link, Image };
