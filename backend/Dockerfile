# Use an official Maven image for building the app
FROM maven:3-eclipse-temurin-17 AS build

WORKDIR /app

# Copy project files
COPY . .

# Change to backend directory where the pom.xml is located
WORKDIR /app/backend

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JDK image for running the final container
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]


