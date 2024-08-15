import { useEffect } from 'react';

const useLazyLoad = (ref, options, callback) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    const elements = ref.current?.children;
    if (elements) {
      Array.from(elements).forEach(element => observer.observe(element));
    }

    return () => {
      if (elements) {
        Array.from(elements).forEach(element => observer.unobserve(element));
      }
    };
  }, [ref, options, callback]);
};

export default useLazyLoad;
//


import React, { useRef, useState } from 'react';

const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const handleLoad = () => setLoaded(true);

  return (
    <img
      ref={imgRef}
      src={loaded ? src : ''}
      data-src={src}
      alt={alt}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default LazyImage;


import React, { useRef } from 'react';
import LazyImage from './LazyImage';
import useLazyLoad from './useLazyLoad';

const ImageContainer = () => {
  const containerRef = useRef(null);

  const lazyLoadCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  };

  useLazyLoad(containerRef, { root: containerRef.current, rootMargin: '1000px 0px', threshold: 0 }, lazyLoadCallback);

  return (
    <div
      ref={containerRef}
      style={{ overflowX: 'scroll', whiteSpace: 'nowrap', width: '100%' }}
    >
      <LazyImage src="image1.jpg" alt="Image 1" style={{ width: '200px', height: 'auto' }} />
      <LazyImage src="image2.jpg" alt="Image 2" style={{ width: '200px', height: 'auto' }} />
      {/* More LazyImage components */}
    </div>
  );
};

export default ImageContainer;
/* note that all the img need a placeholder, with the same size of img, so it wont change the size of the whole img list */
/* 511.68px  * 18rem */





/* ************ another way */

import loadingUrl from '@/assets/imgs/loading.jpg';
import styles from '../index.less';
import React, { useRef, useEffect, useState } from 'react';
// 图片url
const imgUrls = (num = 10) => {
  const urls = [];
  for (let i = 0; i < num; i++) {
    const url = `https://robohash.org/${i}.png`;
    urls.push(url);
  }
  return urls;
};

const LazyLoadImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(loadingUrl);
  const imgRef = useRef(null as any);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (imgRef.current) {
      // 创建IntersectionObserver实例
      observer = new IntersectionObserver(
        ([entry]) => {
          // 当图片进入可视区域时，设置图片地址进行加载
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(imgRef.current);
          }
        },
        {
          rootMargin: '0px 0px 200px 0px', // 可视区域的上边距设置为200px
        },
      );
      observer.observe(imgRef.current); //开始观察目标元素
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return <img ref={imgRef} src={imageSrc} alt={alt} />;
};

const LazyLoading = () => {
  return (
    <div className={styles['box-two']}>
      {imgUrls(100).map((item) => {
        return <LazyLoadImage src={item} alt="lazy load image" />;
      })}
    </div>
  );
};

export default LazyLoading;
