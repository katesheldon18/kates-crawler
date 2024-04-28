import styles from "./index.module.scss";
import { useState } from "react";
import React from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.h1}>KATE'S CRAWLER</h1>
        <div className={styles.welcomeText}>
          WELCOME TO MY SEO SPIDER. PLEASE TYPE THE URL BELOW TO BEGIN YOUR
          CRAWL.
        </div>
      </div>
      <div className={styles.startCrawlContainer}>
        <div className={styles.logo}>🤖</div>
        <input
          className={styles.urlInput}
          placeholder="https://www.example.com..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button
          className={styles.buttonStart}
          onClick={() => {
            fetch(`/api/sitemap?url=${url}`);
          }}
        >
          START
        </button>
        <div className={styles.loadbar}>CRAWLING...</div>
        <button className={styles.buttonExport}>EXPORT</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeading}>URL</th>
            <th className={styles.tableHeading}>STATUS CODE</th>
            <th className={styles.tableHeading}>CONTENT TYPE</th>
            <th className={styles.tableHeading}>META TITLE</th>
            <th className={styles.tableHeading}>META DESCRIPTION</th>
            <th className={styles.tableHeading}>INTERNAL LINKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tableCell}>https://www.example.com</td>
            <td className={styles.tableCell}>200</td>
            <td className={styles.tableCell}>text/html</td>
            <td className={styles.tableCell}>Hello There</td>
            <td className={styles.tableCell}>Welcome to the website.</td>
            <td className={styles.tableCell}>547</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
