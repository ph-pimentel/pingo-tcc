import React from "react";
import styles from "./FormulariosQuadras.module.css";

const FormulariosQuadras = () => {
  return (
    <div className={styles.forms}>
      <a href="https://forms.gle/8YhKLMtoM328ygM5A" className={styles.container} target="_blank">
      <button className={styles.btn}>Formulário Proprietario</button>
      </a>
      <a href="https://forms.gle/5JNxMt2JffQjGFym7" className={styles.container} target="_blank">
      <button className={styles.btn}>Formulário Quadra Privada</button>
      </a>
      <a href="https://forms.gle/h52KTDZJe7EfmU159" className={styles.container} target="_blank">
      <button className={styles.btn}>Formulário Quadra Pública</button>
      </a>
    </div>
  );
};

export default FormulariosQuadras;
