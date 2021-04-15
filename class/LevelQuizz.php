<?php

class LevelQuizz
{
    const BAD = 20;
    const NOTREALLYGOOD = 40;
    const CANDOBETTER = 60;
    const GOOD = 80;
    const GREAT = 100;

    private BDD $bdd;

    public function __construct(BDD $bdd)
    {
        $this->bdd = $bdd;
    }

    public function level($id)
    {
        $moyenne = $this->calculMoyenne($id);

        if ($moyenne <= self::BAD) {
            return '&#11088;&#9734;&#9734;&#9734;&#9734;';
        } else if ($moyenne <= self::NOTREALLYGOOD) {
            return '&#11088;&#11088;&#9734;&#9734;&#9734;';
        } else if ($moyenne <= self::CANDOBETTER) {
            return '&#11088;&#11088;&#11088;&#9734;&#9734;';
        } else if ($moyenne <= self::GOOD) {
            return '&#11088;&#11088;&#11088;&#11088;&#9734;';
        } else if ($moyenne <= self::GREAT) {
            return '&#11088;&#11088;&#11088;&#11088;&#11088;';
        }

        return "$moyenne";
    }

    public function calculMoyenne($id): int
    {
        $arraySuccess = [];
        $list = $this->bdd->getSuccessRate($id);
        for ($i = 0; $i < count($list); $i++) {
            $arraySuccess[$i] = $list[$i]['success_rate'];
        }

        $moyenne = array_sum($arraySuccess) / count($list);

        return $moyenne;
    }
}
