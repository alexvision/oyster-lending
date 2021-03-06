import React, { useMemo } from "react";
import { LendingReserve } from "../../models/lending";
import { fromLamports, wadToLamports } from "../../utils/utils";
import { useMint } from "../../contexts/accounts";
import { WaterWave } from "./../WaterWave";
import { Statistic } from "antd";

export const ReserveUtilizationChart = (props: { reserve: LendingReserve }) => {
  const mintAddress = props.reserve.liquidityMint?.toBase58();
  const liquidityMint = useMint(mintAddress);
  const availableLiquidity = fromLamports(
    props.reserve.availableLiquidity.toNumber(),
    liquidityMint
  );

  const totalBorrows = useMemo(
    () =>
      fromLamports(
        wadToLamports(props.reserve.borrowedLiquidityWad),
        liquidityMint
      ),
    [props.reserve, liquidityMint]
  );

  const percent = (availableLiquidity * 100) / (availableLiquidity + totalBorrows);

  return (
    <WaterWave
      style={{ height: 300 }}
      showPercent={false}
      title={
        <Statistic
        title="Utilization"
        value={percent}
        suffix="%"
        precision={2} />
      }
      percent={percent}
    />
  );
};
