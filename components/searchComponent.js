import styles from './searchcomponent.module.css'

export default function SearchComponent() {
    return (
        <div className="searchComponent">
            <div className={styles.searchComponent}>
                {/* This is the search component */}
                <input type={"text"} placeholder='Search for a User...'/> 
                <div className={styles.searchUserList}>
                    <p>Caleb kaip @username</p>
                    <p>David AKpan</p>
                </div>
            </div>

        </div>
    )
}