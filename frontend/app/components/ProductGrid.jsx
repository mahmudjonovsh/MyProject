import styles from './ProductGrid.module.scss';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Premium Package',
    price: '$99/month',
    description: 'Perfect for small teams and startups',
    features: ['10 Users', '100GB Storage', 'Priority Support'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  },
  {
    id: 2,
    name: 'Business Package',
    price: '$199/month',
    description: 'Ideal for growing businesses',
    features: ['50 Users', '500GB Storage', 'Advanced Analytics', 'API Access'],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    name: 'Enterprise Package',
    price: '$499/month',
    description: 'For large organizations',
    features: ['Unlimited Users', '2TB Storage', 'Custom Integrations', 'Dedicated Support'],
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
  }
];

export default function ProductGrid() {
  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Pricing Plans</h2>
          <p className={styles.subtitle}>
            Choose the perfect plan for your needs
          </p>
        </div>
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.cardHeader}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className={styles.productImage}
                  />
                </div>
                <h3 className={styles.productName}>
                  {product.name}
                </h3>
                <div className={styles.price}>
                  {product.price}
                </div>
                <p className={styles.description}>
                  {product.description}
                </p>
              </div>
              <div className={styles.features}>
                <ul className={styles.featureList}>
                  {product.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.cardFooter}>
                <button className={styles.selectButton}>
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}