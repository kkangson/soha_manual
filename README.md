# SOHA Manual 📖

[Korean version below](#soha-manual-korean)

SOHA Manual is a comprehensive training guide application designed for service excellence at **Soju Haus**.  
Its purpose is to help restaurant staff fully master the menu composition and provide the best possible service to customers.

## 🚀 Key Features

### 1. Menu Guide
*   **Detailed Information**: View Korean/English names, prices, and descriptions (Notes) for each menu item at a glance.
*   **Table Setting Verification**: Provides intuitive visual guides with icons for the exact table settings (utensils, tools, etc.) required for each dish.
*   **Menu Attributes**: Displays dietary information (vegetarian, spice levels, specific ingredients, etc.) as attributes to enable immediate response to customer inquiries.

### 2. Smart Navigation
*   **Category Sticky Bar**: The current menu category remains fixed at the top for easy orientation.
*   **Quick Jump**: Provides a circular navigation feature where clicking the category header jumps to the next category.
*   **Filtering**: Includes a toggle to view only those menu items that require specific table settings.

### 3. High-Quality UX/UI
*   **Mobile Optimized**: A responsive layout designed for quick and easy access on mobile devices within the store.
*   **Rich Design**: Features smooth animations, intuitive icons, and a visually comfortable Stone theme color palette.

### 4. Real-time Data Synchronization
*   **Hygraph (Headless CMS)**: Menu information can be updated in real-time via the Hygraph admin panel without any code changes.

## 🛠 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Library**: [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Data Management**: [Hygraph](https://hygraph.com/) (GraphQL)

## 📦 Getting Started

First, set up the project and install dependencies:

1.  **Environment Variables**: Create a `.env.local` file in the project root and set the following variables.
    ```env
    NEXT_PUBLIC_HYGRAPH_ENDPOINT=your_hygraph_endpoint
    HYGRAPH_PROD_AUTH_TOKEN=your_hygraph_token
    ```

2.  **Install Packages**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

<a name="soha-manual-korean"></a>
# SOHA Manual (Korean) 📖

SOHA Manual은 **Soju Haus**의 서비스 엑셀런스를 위한 종합 교육 가이드 애플리케이션입니다.  
레스토랑 직원들이 메뉴 구성을 완벽하게 숙지하고, 고객에게 최상의 서비스를 제공할 수 있도록 돕는 것을 목적으로 합니다.

## 🚀 주요 기능

### 1. 메뉴 가이드 (Menu Guide)
*   **상세 정보 제공**: 각 메뉴의 한국어/영어 명칭, 가격, 설명(Notes)을 한눈에 확인 가능합니다.
*   **테이블 세팅 확인**: 메뉴별로 필요한 정확한 테이블 세팅(식기, 도구 등)을 아이콘과 함께 직관적으로 보여줍니다.
*   **메뉴 속성 정보**: 메뉴의 특징(채식, 매운 정도, 특정 재료 등)을 속성(Attributes)으로 표시하여 고객 문의에 즉각 대응할 수 있습니다.

### 2. 스마트 내비게이션
*   **카테고리 스티키 바**: 현재 보고 있는 메뉴의 카테고리를 상단에 고정하여 위치 파악이 용이합니다.
*   **빠른 이동**: 카테고리 헤더를 클릭하여 다음 카테고리로 빠르게 이동할 수 있는 순환 내비게이션 기능을 제공합니다.
*   **필터링**: 테이블 세팅이 필요한 메뉴만 별도로 모아볼 수 있는 토글 기능을 제공합니다.

### 3. 고품질 UX/UI
*   **모바일 최적화**: 매장 내에서 모바일 기기로 쉽고 빠르게 확인할 수 있는 반응형 레이아웃입니다.
*   **Rich 디자인**: 부드러운 애니메이션, 직관적인 아이콘 사용, 시각적으로 편안한 스톤(Stone) 테마 컬러를 적용했습니다.

### 4. 실시간 데이터 동기화
*   **Hygraph (Headless CMS)**: 메뉴 정보를 코드 수정 없이 Hygraph 관리자 페이지에서 실시간으로 업데이트할 수 있습니다.

## 🛠 기술 스택

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Library**: [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Data Management**: [Hygraph](https://hygraph.com/) (GraphQL)

## 📦 시작하기

먼저 프로젝트 설정 및 의존성 패키지를 설치합니다:

1.  **환경 변수 설정**: 프로젝트 루트에 `.env.local` 파일을 생성하고 아래 변수들을 설정합니다.
    ```env
    NEXT_PUBLIC_HYGRAPH_ENDPOINT=your_hygraph_endpoint
    HYGRAPH_PROD_AUTH_TOKEN=your_hygraph_token
    ```

2.  **패키지 설치**:
    ```bash
    npm install
    ```

3.  **개발 서버 실행**:
    ```bash
    npm run dev
    ```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

---

**SOHA Manual** - *A comprehensive guide for service excellence.*
