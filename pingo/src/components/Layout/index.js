import styles from "./layout.module.css";

import Footer from "../Footer";
import Header from "../Header";


function Layout({children}) {
    
    return (

        <div className={styles.layout_container}>

            <Header/>
             <main className={styles.content}>{children}</main>
            <Footer/>
        </div>
    );
}

export default Layout;
