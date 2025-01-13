import { Text } from '@/components/Text/Text'
import { HomeContentClientAction } from './HomeContentClientAction'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Text
        as="h1"
        className={`${styles['anime-text']}`}
      >
        Catch UP, Front!
      </Text>
      <div className={styles.content}>
        <HomeContentClientAction />
        
      </div>
    </main>
  )
}