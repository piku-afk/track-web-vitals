-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('MOBILE', 'DESKTOP');

-- CreateTable
CREATE TABLE "MetricData" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "performance_metric_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" VARCHAR(20) NOT NULL,
    "displayValue" VARCHAR(255) NOT NULL,

    CONSTRAINT "MetricData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceMetric" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "PerformanceMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR(255) NOT NULL,
    "type" "ReportType" NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MetricData" ADD CONSTRAINT "MetricData_performance_metric_id_fkey" FOREIGN KEY ("performance_metric_id") REFERENCES "PerformanceMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricData" ADD CONSTRAINT "MetricData_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
