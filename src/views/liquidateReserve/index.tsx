import React from "react";
import { useParams } from "react-router-dom";
import { useEnrichedLendingObligation, useLendingReserve } from "../../hooks";
import {
  SideReserveOverview,
  SideReserveOverviewMode,
} from "../../components/SideReserveOverview";

import { LiquidateInput } from "../../components/LiquidateInput";

import "./style.less";

export const LiquidateReserveView = () => {
  const { id } = useParams<{ id: string }>();

  const obligation = useEnrichedLendingObligation(id);
  const repayReserve = useLendingReserve(obligation?.info.borrowReserve);
  const withdrawReserve = useLendingReserve(
    obligation?.info.collateralReserve
  );

  if (!obligation || !repayReserve) {
    return null;
  }

  return (
    <div className="liquidate-reserve">
      <div className="liquidate-reserve-container">
        <LiquidateInput
          className="liquidate-reserve-item liquidate-reserve-item-left"
          obligation={obligation}
          withdrawReserve={withdrawReserve}
          repayReserve={repayReserve}
        />
        <SideReserveOverview
          className="liquidate-reserve-item liquidate-reserve-item-right"
          reserve={repayReserve}
          mode={SideReserveOverviewMode.Deposit}
        />
      </div>
    </div>
  );
};
