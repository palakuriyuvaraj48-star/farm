# KrishiAI - Project Structure

## Complete Directory Tree

```
KrishiAI/
│
├── frontend/                              # Next.js Frontend Application
│   ├── public/                            # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   │
│   ├── src/
│   │   ├── app/                           # Next.js App Router
│   │   │   ├── page.tsx                   # Home page
│   │   │   ├── layout.tsx                 # Root layout
│   │   │   ├── globals.css                # Global styles
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── verify-otp/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx               # Main dashboard
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── crop-recommendation/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── profit-prediction/page.tsx
│   │   │   │   ├── weather/page.tsx
│   │   │   │   ├── irrigation/page.tsx
│   │   │   │   ├── disease-detection/page.tsx
│   │   │   │   ├── market-prices/page.tsx
│   │   │   │   ├── schemes/page.tsx
│   │   │   │   ├── settings/page.tsx
│   │   │   │   └── profile/page.tsx
│   │   │   ├── community/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── create/page.tsx
│   │   │   ├── marketplace/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [category]/page.tsx
│   │   │   ├── warehouse/page.tsx
│   │   │   ├── labor/page.tsx
│   │   │   ├── finance/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loan-calculator/page.tsx
│   │   │   │   └── emi-calculator/page.tsx
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── users/page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       └── settings/page.tsx
│   │   │
│   │   ├── components/                    # Reusable components
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── OTPVerification.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── WeatherWidget.tsx
│   │   │   │   ├── CropRecommendationWidget.tsx
│   │   │   │   ├── ProfitPredictionWidget.tsx
│   │   │   │   ├── MarketTrendsWidget.tsx
│   │   │   │   ├── SchemeWidget.tsx
│   │   │   │   ├── VoiceAssistantPanel.tsx
│   │   │   │   └── AlertsPanel.tsx
│   │   │   │
│   │   │   ├── forms/
│   │   │   │   ├── CropRecommendationForm.tsx
│   │   │   │   ├── ProfitCalculatorForm.tsx
│   │   │   │   ├── IrrigationForm.tsx
│   │   │   │   ├── DiseaseUploadForm.tsx
│   │   │   │   ├── SchemeFilterForm.tsx
│   │   │   │   ├── LoanCalculatorForm.tsx
│   │   │   │   └── EMICalculatorForm.tsx
│   │   │   │
│   │   │   ├── cards/
│   │   │   │   ├── CropCard.tsx
│   │   │   │   ├── MarketCard.tsx
│   │   │   │   ├── SchemeCard.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   └── WarehouseCard.tsx
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── Notification.tsx
│   │   │   │   ├── Pagination.tsx
│   │   │   │   └── Tabs.tsx
│   │   │   │
│   │   │   ├── charts/
│   │   │   │   ├── LineChart.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── PieChart.tsx
│   │   │   │   ├── AreaChart.tsx
│   │   │   │   └── TrendChart.tsx
│   │   │   │
│   │   │   └── community/
│   │   │       ├── ForumThread.tsx
│   │   │       ├── CommentSection.tsx
│   │   │       └── UserAvatar.tsx
│   │   │
│   │   ├── hooks/                         # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useAPI.ts
│   │   │   ├── useFarmerProfile.ts
│   │   │   ├── useWeather.ts
│   │   │   ├── useNotification.ts
│   │   │   ├── useVoiceAssistant.ts
│   │   │   ├── useFormValidation.ts
│   │   │   └── useLocalStorage.ts
│   │   │
│   │   ├── services/                      # API services
│   │   │   ├── api.ts                     # Axios instance
│   │   │   ├── auth.service.ts
│   │   │   ├── farmer.service.ts
│   │   │   ├── crop-recommendation.service.ts
│   │   │   ├── profit-prediction.service.ts
│   │   │   ├── weather.service.ts
│   │   │   ├── irrigation.service.ts
│   │   │   ├── disease-detection.service.ts
│   │   │   ├── market.service.ts
│   │   │   ├── schemes.service.ts
│   │   │   ├── community.service.ts
│   │   │   ├── marketplace.service.ts
│   │   │   ├── warehouse.service.ts
│   │   │   ├── labor.service.ts
│   │   │   └── finance.service.ts
│   │   │
│   │   ├── utils/                         # Utility functions
│   │   │   ├── constants.ts
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── storage.ts
│   │   │   ├── errors.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── store/                         # State management (Zustand/Redux)
│   │   │   ├── authStore.ts
│   │   │   ├── farmerStore.ts
│   │   │   ├── weatherStore.ts
│   │   │   └── notificationStore.ts
│   │   │
│   │   ├── types/                         # TypeScript types
│   │   │   ├── index.ts
│   │   │   ├── auth.types.ts
│   │   │   ├── farmer.types.ts
│   │   │   ├── crop.types.ts
│   │   │   ├── market.types.ts
│   │   │   ├── weather.types.ts
│   │   │   └── common.types.ts
│   │   │
│   │   └── styles/                        # Tailwind styles
│   │       ├── globals.css
│   │       ├── components.css
│   │       └── variables.css
│   │
│   ├── .env.local                         # Environment variables
│   ├── .env.example
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── backend/                               # Java Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/krishiai/
│   │   │   │   ├── KrishiAIApplication.java    # Main app entry
│   │   │   │   │
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── FarmerController.java
│   │   │   │   │   ├── CropRecommendationController.java
│   │   │   │   │   ├── ProfitPredictionController.java
│   │   │   │   │   ├── WeatherController.java
│   │   │   │   │   ├── IrrigationController.java
│   │   │   │   │   ├── DiseaseDetectionController.java
│   │   │   │   │   ├── MarketController.java
│   │   │   │   │   ├── SchemeController.java
│   │   │   │   │   ├── CommunityController.java
│   │   │   │   │   ├── MarketplaceController.java
│   │   │   │   │   ├── WarehouseController.java
│   │   │   │   │   ├── LaborController.java
│   │   │   │   │   ├── FinanceController.java
│   │   │   │   │   └── AdminController.java
│   │   │   │   │
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── FarmerService.java
│   │   │   │   │   ├── CropRecommendationService.java
│   │   │   │   │   ├── ProfitPredictionService.java
│   │   │   │   │   ├── WeatherService.java
│   │   │   │   │   ├── IrrigationService.java
│   │   │   │   │   ├── DiseaseDetectionService.java
│   │   │   │   │   ├── MarketService.java
│   │   │   │   │   ├── SchemeService.java
│   │   │   │   │   ├── CommunityService.java
│   │   │   │   │   ├── MarketplaceService.java
│   │   │   │   │   ├── WarehouseService.java
│   │   │   │   │   ├── LaborService.java
│   │   │   │   │   ├── FinanceService.java
│   │   │   │   │   ├── NotificationService.java
│   │   │   │   │   └── AdminService.java
│   │   │   │   │
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── FarmerRepository.java
│   │   │   │   │   ├── CropRepository.java
│   │   │   │   │   ├── CropHistoryRepository.java
│   │   │   │   │   ├── WeatherRepository.java
│   │   │   │   │   ├── IrrigationScheduleRepository.java
│   │   │   │   │   ├── DiseaseRepository.java
│   │   │   │   │   ├── MarketPriceRepository.java
│   │   │   │   │   ├── SchemeRepository.java
│   │   │   │   │   ├── ForumPostRepository.java
│   │   │   │   │   ├── ProductRepository.java
│   │   │   │   │   ├── WarehouseRepository.java
│   │   │   │   │   ├── LaborPostRepository.java
│   │   │   │   │   ├── LoanRepository.java
│   │   │   │   │   └── TransactionRepository.java
│   │   │   │   │
│   │   │   │   ├── model/
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Farmer.java
│   │   │   │   │   ├── Land.java
│   │   │   │   │   ├── Crop.java
│   │   │   │   │   ├── CropHistory.java
│   │   │   │   │   ├── CropRecommendation.java
│   │   │   │   │   ├── Weather.java
│   │   │   │   │   ├── IrrigationSchedule.java
│   │   │   │   │   ├── Disease.java
│   │   │   │   │   ├── DiseaseDetectionResult.java
│   │   │   │   │   ├── MarketPrice.java
│   │   │   │   │   ├── PriceHistory.java
│   │   │   │   │   ├── Scheme.java
│   │   │   │   │   ├── ForumPost.java
│   │   │   │   │   ├── Comment.java
│   │   │   │   │   ├── Product.java
│   │   │   │   │   ├── Order.java
│   │   │   │   │   ├── Warehouse.java
│   │   │   │   │   ├── LaborPost.java
│   │   │   │   │   ├── Loan.java
│   │   │   │   │   ├── Transaction.java
│   │   │   │   │   ├── Alert.java
│   │   │   │   │   └── Notification.java
│   │   │   │   │
│   │   │   │   ├── dto/
│   │   │   │   │   ├── AuthDTO.java
│   │   │   │   │   ├── FarmerDTO.java
│   │   │   │   │   ├── CropRecommendationDTO.java
│   │   │   │   │   ├── ProfitPredictionDTO.java
│   │   │   │   │   ├── WeatherDTO.java
│   │   │   │   │   ├── IrrigationDTO.java
│   │   │   │   │   ├── DiseaseDetectionDTO.java
│   │   │   │   │   ├── MarketDTO.java
│   │   │   │   │   ├── SchemeDTO.java
│   │   │   │   │   ├── CommunityDTO.java
│   │   │   │   │   ├── MarketplaceDTO.java
│   │   │   │   │   ├── WarehouseDTO.java
│   │   │   │   │   ├── LaborDTO.java
│   │   │   │   │   ├── FinanceDTO.java
│   │   │   │   │   └── ResponseDTO.java
│   │   │   │   │
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   ├── JwtConfig.java
│   │   │   │   │   ├── DatabaseConfig.java
│   │   │   │   │   ├── CacheConfig.java
│   │   │   │   │   └── ExternalAPIConfig.java
│   │   │   │   │
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   │   ├── UserPrincipal.java
│   │   │   │   │   ├── AuthenticationEntryPoint.java
│   │   │   │   │   ├── AccessDeniedHandler.java
│   │   │   │   │   └── PasswordEncoder.java
│   │   │   │   │
│   │   │   │   ├── exception/
│   │   │   │   │   ├── ApiException.java
│   │   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   │   ├── AuthenticationException.java
│   │   │   │   │   ├── ValidationException.java
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   └── ErrorResponse.java
│   │   │   │   │
│   │   │   │   ├── util/
│   │   │   │   │   ├── JwtUtils.java
│   │   │   │   │   ├── ValidationUtils.java
│   │   │   │   │   ├── DateUtils.java
│   │   │   │   │   ├── ImageUtils.java
│   │   │   │   │   ├── AIUtils.java
│   │   │   │   │   └── Constants.java
│   │   │   │   │
│   │   │   │   ├── mapper/
│   │   │   │   │   ├── UserMapper.java
│   │   │   │   │   ├── FarmerMapper.java
│   │   │   │   │   ├── CropMapper.java
│   │   │   │   │   ├── MarketMapper.java
│   │   │   │   │   └── CommonMapper.java
│   │   │   │   │
│   │   │   │   ├── integrations/
│   │   │   │   │   ├── WeatherAPIClient.java
│   │   │   │   │   ├── MarketPriceAPIClient.java
│   │   │   │   │   ├── SMSClient.java
│   │   │   │   │   └── EmailClient.java
│   │   │   │   │
│   │   │   │   └── ai/
│   │   │   │       ├── CropRecommendationModel.java
│   │   │   │       ├── ProfitPredictionModel.java
│   │   │   │       ├── PricePredictionModel.java
│   │   │   │       └── DiseaseDetectionModel.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       ├── application-prod.properties
│   │   │       └── db/
│   │   │           └── migration/
│   │   │               ├── V1__Initial_Schema.sql
│   │   │               ├── V2__Add_Indexes.sql
│   │   │               └── V3__Seed_Data.sql
│   │   │
│   │   └── test/
│   │       ├── java/com/krishiai/
│   │       │   ├── controller/
│   │       │   │   ├── AuthControllerTest.java
│   │       │   │   ├── FarmerControllerTest.java
│   │       │   │   ├── CropRecommendationControllerTest.java
│   │       │   │   └── ...
│   │       │   │
│   │       │   ├── service/
│   │       │   │   ├── AuthServiceTest.java
│   │       │   │   ├── FarmerServiceTest.java
│   │       │   │   ├── CropRecommendationServiceTest.java
│   │       │   │   └── ...
│   │       │   │
│   │       │   └── integration/
│   │       │       ├── AuthIntegrationTest.java
│   │       │       └── CropRecommendationIntegrationTest.java
│   │       │
│   │       └── resources/
│   │           └── application-test.properties
│   │
│   ├── pom.xml                            # Maven configuration
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── README.md
│   └── .gitignore
│
├── ai-models/                             # Python AI/ML Models
│   ├── src/
│   │   ├── crop_recommendation/
│   │   │   ├── __init__.py
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   ├── predict.py
│   │   │   ├── features.py
│   │   │   ├── data_processor.py
│   │   │   └── evaluate.py
│   │   │
│   │   ├── profit_prediction/
│   │   │   ├── __init__.py
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   ├── predict.py
│   │   │   └── features.py
│   │   │
│   │   ├── disease_detection/
│   │   │   ├── __init__.py
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   ├── predict.py
│   │   │   ├── image_processor.py
│   │   │   └── dataset_loader.py
│   │   │
│   │   ├── price_prediction/
│   │   │   ├── __init__.py
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   ├── predict.py
│   │   │   ├── time_series.py
│   │   │   └── features.py
│   │   │
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── data_loader.py
│   │   │   ├── preprocessing.py
│   │   │   ├── validation.py
│   │   │   ├── visualization.py
│   │   │   └── metrics.py
│   │   │
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── app.py                    # Flask/FastAPI server
│   │   │   ├── routes.py
│   │   │   ├── middleware.py
│   │   │   └── serializers.py
│   │   │
│   │   ├── models/                        # Pre-trained models storage
│   │   │   ├── crop_model.pkl
│   │   │   ├── disease_model.h5
│   │   │   ├── price_model.pkl
│   │   │   └── profit_model.pkl
│   │   │
│   │   └── data/
│   │       ├── raw/
│   │       ├── processed/
│   │       ├── train/
│   │       └── test/
│   │
│   ├── notebooks/
│   │   ├── crop_recommendation.ipynb
│   │   ├── disease_detection.ipynb
│   │   ├── price_prediction.ipynb
│   │   └── profit_prediction.ipynb
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── README.md
│   └── .gitignore
│
├── infrastructure/                        # DevOps & Deployment
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.ai
│   │   └── .dockerignore
│   │
│   ├── kubernetes/
│   │   ├── namespaces.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── ai-deployment.yaml
│   │   ├── postgres-deployment.yaml
│   │   ├── redis-deployment.yaml
│   │   ├── ingress.yaml
│   │   ├── services.yaml
│   │   ├── configmaps.yaml
│   │   ├── secrets.yaml
│   │   └── hpa.yaml
│   │
│   ├── aws/
│   │   ├── cloudformation/
│   │   │   ├── vpc.yaml
│   │   │   ├── rds.yaml
│   │   │   ├── ec2.yaml
│   │   │   ├── s3.yaml
│   │   │   └── iam.yaml
│   │   │
│   │   ├── terraform/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   ├── backend.tf
│   │   │   ├── security_groups.tf
│   │   │   └── rds.tf
│   │   │
│   │   └── scripts/
│   │       ├── deploy.sh
│   │       ├── rollback.sh
│   │       └── health-check.sh
│   │
│   ├── ci-cd/
│   │   ├── github-actions/
│   │   │   ├── .github/workflows/
│   │   │   │   ├── backend-ci.yml
│   │   │   │   ├── frontend-ci.yml
│   │   │   │   ├── ai-ci.yml
│   │   │   │   └── deploy.yml
│   │   │   └── scripts/
│   │   │       ├── build.sh
│   │   │       ├── test.sh
│   │   │       └── deploy.sh
│   │   │
│   │   └── jenkins/
│   │       └── Jenkinsfile
│   │
│   ├── monitoring/
│   │   ├── prometheus/
│   │   │   ├── prometheus.yml
│   │   │   └── alerts.yml
│   │   │
│   │   ├── grafana/
│   │   │   └── dashboards/
│   │   │       ├── system-dashboard.json
│   │   │       └── application-dashboard.json
│   │   │
│   │   └── elk/
│   │       ├── elasticsearch.yml
│   │       ├── kibana.yml
│   │       └── logstash.conf
│   │
│   ├── nginx/
│   │   ├── nginx.conf
│   │   ├── default.conf
│   │   └── ssl/
│   │       ├── cert.pem
│   │       └── key.pem
│   │
│   └── scripts/
│       ├── setup.sh
│       ├── migrate.sh
│       ├── seed.sh
│       └── health-check.sh
│
├── docs/                                  # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── ER_DIAGRAM.md
│   ├── USER_FLOWS.md
│   ├── SETUP_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── TESTING_STRATEGY.md
│   ├── CONTRIBUTING.md
│   ├── ROADMAP.md
│   └── images/
│       ├── architecture.png
│       ├── er-diagram.png
│       ├── user-flows.png
│       ├── wireframes.png
│       └── ui-design.png
│
├── tests/                                 # Comprehensive testing
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── crop-recommendation.spec.ts
│   │   ├── profit-prediction.spec.ts
│   │   ├── marketplace.spec.ts
│   │   └── conftest.py
│   │
│   ├── performance/
│   │   ├── load-test.js
│   │   └── stress-test.js
│   │
│   ├── security/
│   │   ├── injection-test.ts
│   │   └── auth-test.ts
│   │
│   └── api/
│       ├── postman-collection.json
│       └── api-tests.yaml
│
├── scripts/                               # Helper scripts
│   ├── setup-dev.sh
│   ├── start-all.sh
│   ├── stop-all.sh
│   ├── backup.sh
│   ├── restore.sh
│   └── seed-database.sh
│
├── .env.example                           # Environment template
├── .gitignore
├── README.md                              # Main project README
├── ROADMAP.md                             # Future plans
├── CONTRIBUTING.md                        # Contribution guide
└── LICENSE
```

---

Now let me create the **Database Schema** and then proceed with implementation files.
