////Uso do método .map() no React
--> O método JavaScript .map() recebe um Arrays de Dados e armazena esses dados nele (os percorrendo), no React usamos esse método para transformar cada item presente nele em JSX, para ele poder ler esses dados. 
Esse método recebe como parametro uma function callback, essa function callback recebe cada item do array no seu estado original e, retorna um novo valor (JSX), assim retornando uma lista Array em JSX, que o React pode ler

EX:    {menu.map((item) => ( 
        <div className={styles.item} key={item.id}>
          <span className={styles.title}>{item.title}</span>
          {item.listItems.map((listItem) => ( 
            <Link to="/" className={styles.listItem} key={listItem.id}>
            <img src={listItem.icon} alt={listItem.alt} />
            <span className={styles.listItemTitle}>{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}